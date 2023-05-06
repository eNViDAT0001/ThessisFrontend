from flask import Flask, jsonify
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

df = pd.read_csv('src/app/py/comment.csv')


@app.route('/recommend/<int:user_id>', methods=['GET'])
# Define your data and function here
def recommend_products(user_id):
    # Pivot the dataframe
    pivot_df = df.pivot(index='user_id', columns='product_id', values='rating')
    # Reset the column names
    pivot_df.columns.name = None
    # Reset the index name
    pivot_df.index.name = None
    # Calculate the average rating for each product
    product_avg = pivot_df.mean(axis=0)
    # Fill NaN values with 0
    pivot_df = pivot_df.fillna(0)
    # Calculate the user-product matrix by subtracting the product average from each rating
    matrix_avg = pivot_df.sub(product_avg, axis=1)
    # Calculate the cosine similarity matrix
    similarity = cosine_similarity(matrix_avg.T)
    # Get the row of the similarity matrix corresponding to the user
    user_similarity = similarity[user_id-1]
    # Find the top n similar users
    similar_users = user_similarity.argsort()[:-2-1:-1]
    # Find the products that the user has not rated
    unrated_products = pivot_df.loc[user_id][pivot_df.loc[user_id] == 0].index
    # Calculate the predicted rating for each unrated product
    product_predictions = {}
    for product in unrated_products:
        product_ratings = matrix_avg[product].values
        # Only consider ratings from similar users
        similar_ratings = product_ratings[similar_users]
        # Ignore ratings of 0 (unrated products)
        similar_ratings = similar_ratings[similar_ratings != 0]
        if len(similar_ratings) > 0:
            # Calculate the predicted rating as the weighted average of similar ratings
            weights = user_similarity[similar_users][similar_ratings.nonzero()]
            prediction = (similar_ratings * weights).sum() / weights.sum()
            product_predictions[product] = prediction
    # Return the top n predicted products
    recommended_products = sorted(
        product_predictions, key=product_predictions.get, reverse=True)[:5]
    # return recommended_products
    recommended_products_list = [{'id': p} for p in recommended_products]
    return jsonify({'data': recommended_products_list})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
