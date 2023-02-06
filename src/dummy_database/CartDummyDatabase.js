import { CartModel } from "../models/Cart/Cart";
import { CartItemsModel } from "../models/Cart/CartItems";
const CartItemsList = [
    new CartItemsModel({
        id: 0,
        images: "data:image/webp;base64,UklGRsADAABXRUJQVlA4ILQDAABwEQCdASo8AFAAPmkqj0WkIqEbOb4AQAaEswBiSkeDkH5edQG+iDbL87d6Hehp9W70AOlsn3bPnwF2ly/Hztvl9Zv/Q8wP1GoYsJap2Lhc43wNlFyZAhrRlF8iv1w+ahHHgV0GEIkU0+63ze2u2TK1yq8KeZRROJSaS8aY0Ij8urQGWUp6og46e+XghkuJ8/70ilEAAP78hrCiyAIvxF0XyGBx73TyVMtmk0dc9WVfPa+jU4vlFw7PJomDFITtXM7F/GBwa8XIH+H6u6Lww27AW2WQuLBA5lx1u75hz98IkGtIkJh85Gigg3zfP/NAeRrEBahAO8Jfw5y+RY/ovATT7O/d7xzXjykR6Pinq1sz/G6BtcKmd+ecF8YbwUGPqTbpo5Qo/y/T+n/HuKieqP+T5AWFjbqMuywwYbJbqm8SnoXH/2JVkzq62L+a1l0hLcOJXEOv8ggnsYSjtKj6gzNWA+RwwjGDpzuK0c9MitwIqUIKfECYtvhXVwYBB2Cylkno/E3upBw9kFw3oqmEeBX84hIpfYf1q/4LaUL0qUCIzQ/RcJVy5iu1hE6a1TYrIeNMgkFb8BHxx/RjRqprK2QOmnnlH/iHsKREmeEd1ZtWkNoQB1FlF503MkyiooHYLeBPxYESX/5jdcuzx1liiZ6e3K1mxgxx41RUYHYy91RYlH6LoGl/td42wUdZPOKHpPyiGt9vczsMMOCn9B/P3hau4Ibdoh1wtebjPv6/RwaJiSzUdxzynosQkyMuFLkp8tYmWLk3Y4GVssI9Tukq/tQp8mIRM+u+S1BjtVg28WmnbsW4PK+O2ako+T3i6/V32ozKfYqq/yd2F/7QXuABF+qMJtPL1fs5Ah9J4tc/tsiAoefyrgfEt9sVeyvPLDMT/a8sZMPqoBmfxKyxVWQ/RZH8oN6TczEwvlEqSB2BNq+aaptYpNQORkicVy6j1QTJUMn9cbFT9KOv/omxydNSo++uJMmURi005a00kVjrHuK9iF1YynB0gzr8b/mATy0N8Tv5jv2uBFtXWd9VUs3BZvPittxx9m23fylkJhB+J1BLtseFHSazcV0pJakJrstHSi7glV5F3TLgtbBz9EYE04onvlcixah+fv1A5Q0cw7Dej7uWUefw3oajgXbqmPxsB0YzC+6uIa4FfGtA0A6aRPDyz96EWes4P6Ahp9YGru4Un7csa3+lt12dcH+XD+hswImC8oxdg+AyKrW0HK2GTAEm+3z+uc7wsPQgIdfBZykpXsIwAAA=",
        name: "Fresh Strawberries",
        price: 36.00
    }),
    new CartItemsModel({
        id: 1,
        images: "data:image/webp;base64,UklGRsADAABXRUJQVlA4ILQDAABwEQCdASo8AFAAPmkqj0WkIqEbOb4AQAaEswBiSkeDkH5edQG+iDbL87d6Hehp9W70AOlsn3bPnwF2ly/Hztvl9Zv/Q8wP1GoYsJap2Lhc43wNlFyZAhrRlF8iv1w+ahHHgV0GEIkU0+63ze2u2TK1yq8KeZRROJSaS8aY0Ij8urQGWUp6og46e+XghkuJ8/70ilEAAP78hrCiyAIvxF0XyGBx73TyVMtmk0dc9WVfPa+jU4vlFw7PJomDFITtXM7F/GBwa8XIH+H6u6Lww27AW2WQuLBA5lx1u75hz98IkGtIkJh85Gigg3zfP/NAeRrEBahAO8Jfw5y+RY/ovATT7O/d7xzXjykR6Pinq1sz/G6BtcKmd+ecF8YbwUGPqTbpo5Qo/y/T+n/HuKieqP+T5AWFjbqMuywwYbJbqm8SnoXH/2JVkzq62L+a1l0hLcOJXEOv8ggnsYSjtKj6gzNWA+RwwjGDpzuK0c9MitwIqUIKfECYtvhXVwYBB2Cylkno/E3upBw9kFw3oqmEeBX84hIpfYf1q/4LaUL0qUCIzQ/RcJVy5iu1hE6a1TYrIeNMgkFb8BHxx/RjRqprK2QOmnnlH/iHsKREmeEd1ZtWkNoQB1FlF503MkyiooHYLeBPxYESX/5jdcuzx1liiZ6e3K1mxgxx41RUYHYy91RYlH6LoGl/td42wUdZPOKHpPyiGt9vczsMMOCn9B/P3hau4Ibdoh1wtebjPv6/RwaJiSzUdxzynosQkyMuFLkp8tYmWLk3Y4GVssI9Tukq/tQp8mIRM+u+S1BjtVg28WmnbsW4PK+O2ako+T3i6/V32ozKfYqq/yd2F/7QXuABF+qMJtPL1fs5Ah9J4tc/tsiAoefyrgfEt9sVeyvPLDMT/a8sZMPqoBmfxKyxVWQ/RZH8oN6TczEwvlEqSB2BNq+aaptYpNQORkicVy6j1QTJUMn9cbFT9KOv/omxydNSo++uJMmURi005a00kVjrHuK9iF1YynB0gzr8b/mATy0N8Tv5jv2uBFtXWd9VUs3BZvPittxx9m23fylkJhB+J1BLtseFHSazcV0pJakJrstHSi7glV5F3TLgtbBz9EYE04onvlcixah+fv1A5Q0cw7Dej7uWUefw3oajgXbqmPxsB0YzC+6uIa4FfGtA0A6aRPDyz96EWes4P6Ahp9YGru4Un7csa3+lt12dcH+XD+hswImC8oxdg+AyKrW0HK2GTAEm+3z+uc7wsPQgIdfBZykpXsIwAAA=",
        name: "Fresh Strawberries",
        price: 36.00
    }),
    new CartItemsModel({
        id: 2,
        images: "data:image/webp;base64,UklGRsADAABXRUJQVlA4ILQDAABwEQCdASo8AFAAPmkqj0WkIqEbOb4AQAaEswBiSkeDkH5edQG+iDbL87d6Hehp9W70AOlsn3bPnwF2ly/Hztvl9Zv/Q8wP1GoYsJap2Lhc43wNlFyZAhrRlF8iv1w+ahHHgV0GEIkU0+63ze2u2TK1yq8KeZRROJSaS8aY0Ij8urQGWUp6og46e+XghkuJ8/70ilEAAP78hrCiyAIvxF0XyGBx73TyVMtmk0dc9WVfPa+jU4vlFw7PJomDFITtXM7F/GBwa8XIH+H6u6Lww27AW2WQuLBA5lx1u75hz98IkGtIkJh85Gigg3zfP/NAeRrEBahAO8Jfw5y+RY/ovATT7O/d7xzXjykR6Pinq1sz/G6BtcKmd+ecF8YbwUGPqTbpo5Qo/y/T+n/HuKieqP+T5AWFjbqMuywwYbJbqm8SnoXH/2JVkzq62L+a1l0hLcOJXEOv8ggnsYSjtKj6gzNWA+RwwjGDpzuK0c9MitwIqUIKfECYtvhXVwYBB2Cylkno/E3upBw9kFw3oqmEeBX84hIpfYf1q/4LaUL0qUCIzQ/RcJVy5iu1hE6a1TYrIeNMgkFb8BHxx/RjRqprK2QOmnnlH/iHsKREmeEd1ZtWkNoQB1FlF503MkyiooHYLeBPxYESX/5jdcuzx1liiZ6e3K1mxgxx41RUYHYy91RYlH6LoGl/td42wUdZPOKHpPyiGt9vczsMMOCn9B/P3hau4Ibdoh1wtebjPv6/RwaJiSzUdxzynosQkyMuFLkp8tYmWLk3Y4GVssI9Tukq/tQp8mIRM+u+S1BjtVg28WmnbsW4PK+O2ako+T3i6/V32ozKfYqq/yd2F/7QXuABF+qMJtPL1fs5Ah9J4tc/tsiAoefyrgfEt9sVeyvPLDMT/a8sZMPqoBmfxKyxVWQ/RZH8oN6TczEwvlEqSB2BNq+aaptYpNQORkicVy6j1QTJUMn9cbFT9KOv/omxydNSo++uJMmURi005a00kVjrHuK9iF1YynB0gzr8b/mATy0N8Tv5jv2uBFtXWd9VUs3BZvPittxx9m23fylkJhB+J1BLtseFHSazcV0pJakJrstHSi7glV5F3TLgtbBz9EYE04onvlcixah+fv1A5Q0cw7Dej7uWUefw3oajgXbqmPxsB0YzC+6uIa4FfGtA0A6aRPDyz96EWes4P6Ahp9YGru4Un7csa3+lt12dcH+XD+hswImC8oxdg+AyKrW0HK2GTAEm+3z+uc7wsPQgIdfBZykpXsIwAAA=",
        name: "Fresh Strawberries",
        price: 36.00
    }),
    
]

const CartItemsList2 = [
    new CartItemsModel({
        id: 0,
        images: "data:image/webp;base64,UklGRsADAABXRUJQVlA4ILQDAABwEQCdASo8AFAAPmkqj0WkIqEbOb4AQAaEswBiSkeDkH5edQG+iDbL87d6Hehp9W70AOlsn3bPnwF2ly/Hztvl9Zv/Q8wP1GoYsJap2Lhc43wNlFyZAhrRlF8iv1w+ahHHgV0GEIkU0+63ze2u2TK1yq8KeZRROJSaS8aY0Ij8urQGWUp6og46e+XghkuJ8/70ilEAAP78hrCiyAIvxF0XyGBx73TyVMtmk0dc9WVfPa+jU4vlFw7PJomDFITtXM7F/GBwa8XIH+H6u6Lww27AW2WQuLBA5lx1u75hz98IkGtIkJh85Gigg3zfP/NAeRrEBahAO8Jfw5y+RY/ovATT7O/d7xzXjykR6Pinq1sz/G6BtcKmd+ecF8YbwUGPqTbpo5Qo/y/T+n/HuKieqP+T5AWFjbqMuywwYbJbqm8SnoXH/2JVkzq62L+a1l0hLcOJXEOv8ggnsYSjtKj6gzNWA+RwwjGDpzuK0c9MitwIqUIKfECYtvhXVwYBB2Cylkno/E3upBw9kFw3oqmEeBX84hIpfYf1q/4LaUL0qUCIzQ/RcJVy5iu1hE6a1TYrIeNMgkFb8BHxx/RjRqprK2QOmnnlH/iHsKREmeEd1ZtWkNoQB1FlF503MkyiooHYLeBPxYESX/5jdcuzx1liiZ6e3K1mxgxx41RUYHYy91RYlH6LoGl/td42wUdZPOKHpPyiGt9vczsMMOCn9B/P3hau4Ibdoh1wtebjPv6/RwaJiSzUdxzynosQkyMuFLkp8tYmWLk3Y4GVssI9Tukq/tQp8mIRM+u+S1BjtVg28WmnbsW4PK+O2ako+T3i6/V32ozKfYqq/yd2F/7QXuABF+qMJtPL1fs5Ah9J4tc/tsiAoefyrgfEt9sVeyvPLDMT/a8sZMPqoBmfxKyxVWQ/RZH8oN6TczEwvlEqSB2BNq+aaptYpNQORkicVy6j1QTJUMn9cbFT9KOv/omxydNSo++uJMmURi005a00kVjrHuK9iF1YynB0gzr8b/mATy0N8Tv5jv2uBFtXWd9VUs3BZvPittxx9m23fylkJhB+J1BLtseFHSazcV0pJakJrstHSi7glV5F3TLgtbBz9EYE04onvlcixah+fv1A5Q0cw7Dej7uWUefw3oajgXbqmPxsB0YzC+6uIa4FfGtA0A6aRPDyz96EWes4P6Ahp9YGru4Un7csa3+lt12dcH+XD+hswImC8oxdg+AyKrW0HK2GTAEm+3z+uc7wsPQgIdfBZykpXsIwAAA=",
        name: "Fresh Strawberries",
        price: 36.00
    }),
    new CartItemsModel({
        id: 1,
        images: "data:image/webp;base64,UklGRsADAABXRUJQVlA4ILQDAABwEQCdASo8AFAAPmkqj0WkIqEbOb4AQAaEswBiSkeDkH5edQG+iDbL87d6Hehp9W70AOlsn3bPnwF2ly/Hztvl9Zv/Q8wP1GoYsJap2Lhc43wNlFyZAhrRlF8iv1w+ahHHgV0GEIkU0+63ze2u2TK1yq8KeZRROJSaS8aY0Ij8urQGWUp6og46e+XghkuJ8/70ilEAAP78hrCiyAIvxF0XyGBx73TyVMtmk0dc9WVfPa+jU4vlFw7PJomDFITtXM7F/GBwa8XIH+H6u6Lww27AW2WQuLBA5lx1u75hz98IkGtIkJh85Gigg3zfP/NAeRrEBahAO8Jfw5y+RY/ovATT7O/d7xzXjykR6Pinq1sz/G6BtcKmd+ecF8YbwUGPqTbpo5Qo/y/T+n/HuKieqP+T5AWFjbqMuywwYbJbqm8SnoXH/2JVkzq62L+a1l0hLcOJXEOv8ggnsYSjtKj6gzNWA+RwwjGDpzuK0c9MitwIqUIKfECYtvhXVwYBB2Cylkno/E3upBw9kFw3oqmEeBX84hIpfYf1q/4LaUL0qUCIzQ/RcJVy5iu1hE6a1TYrIeNMgkFb8BHxx/RjRqprK2QOmnnlH/iHsKREmeEd1ZtWkNoQB1FlF503MkyiooHYLeBPxYESX/5jdcuzx1liiZ6e3K1mxgxx41RUYHYy91RYlH6LoGl/td42wUdZPOKHpPyiGt9vczsMMOCn9B/P3hau4Ibdoh1wtebjPv6/RwaJiSzUdxzynosQkyMuFLkp8tYmWLk3Y4GVssI9Tukq/tQp8mIRM+u+S1BjtVg28WmnbsW4PK+O2ako+T3i6/V32ozKfYqq/yd2F/7QXuABF+qMJtPL1fs5Ah9J4tc/tsiAoefyrgfEt9sVeyvPLDMT/a8sZMPqoBmfxKyxVWQ/RZH8oN6TczEwvlEqSB2BNq+aaptYpNQORkicVy6j1QTJUMn9cbFT9KOv/omxydNSo++uJMmURi005a00kVjrHuK9iF1YynB0gzr8b/mATy0N8Tv5jv2uBFtXWd9VUs3BZvPittxx9m23fylkJhB+J1BLtseFHSazcV0pJakJrstHSi7glV5F3TLgtbBz9EYE04onvlcixah+fv1A5Q0cw7Dej7uWUefw3oajgXbqmPxsB0YzC+6uIa4FfGtA0A6aRPDyz96EWes4P6Ahp9YGru4Un7csa3+lt12dcH+XD+hswImC8oxdg+AyKrW0HK2GTAEm+3z+uc7wsPQgIdfBZykpXsIwAAA=",
        name: "Fresh Strawberries",
        price: 36.00
    }),
    new CartItemsModel({
        id: 2,
        images: "data:image/webp;base64,UklGRsADAABXRUJQVlA4ILQDAABwEQCdASo8AFAAPmkqj0WkIqEbOb4AQAaEswBiSkeDkH5edQG+iDbL87d6Hehp9W70AOlsn3bPnwF2ly/Hztvl9Zv/Q8wP1GoYsJap2Lhc43wNlFyZAhrRlF8iv1w+ahHHgV0GEIkU0+63ze2u2TK1yq8KeZRROJSaS8aY0Ij8urQGWUp6og46e+XghkuJ8/70ilEAAP78hrCiyAIvxF0XyGBx73TyVMtmk0dc9WVfPa+jU4vlFw7PJomDFITtXM7F/GBwa8XIH+H6u6Lww27AW2WQuLBA5lx1u75hz98IkGtIkJh85Gigg3zfP/NAeRrEBahAO8Jfw5y+RY/ovATT7O/d7xzXjykR6Pinq1sz/G6BtcKmd+ecF8YbwUGPqTbpo5Qo/y/T+n/HuKieqP+T5AWFjbqMuywwYbJbqm8SnoXH/2JVkzq62L+a1l0hLcOJXEOv8ggnsYSjtKj6gzNWA+RwwjGDpzuK0c9MitwIqUIKfECYtvhXVwYBB2Cylkno/E3upBw9kFw3oqmEeBX84hIpfYf1q/4LaUL0qUCIzQ/RcJVy5iu1hE6a1TYrIeNMgkFb8BHxx/RjRqprK2QOmnnlH/iHsKREmeEd1ZtWkNoQB1FlF503MkyiooHYLeBPxYESX/5jdcuzx1liiZ6e3K1mxgxx41RUYHYy91RYlH6LoGl/td42wUdZPOKHpPyiGt9vczsMMOCn9B/P3hau4Ibdoh1wtebjPv6/RwaJiSzUdxzynosQkyMuFLkp8tYmWLk3Y4GVssI9Tukq/tQp8mIRM+u+S1BjtVg28WmnbsW4PK+O2ako+T3i6/V32ozKfYqq/yd2F/7QXuABF+qMJtPL1fs5Ah9J4tc/tsiAoefyrgfEt9sVeyvPLDMT/a8sZMPqoBmfxKyxVWQ/RZH8oN6TczEwvlEqSB2BNq+aaptYpNQORkicVy6j1QTJUMn9cbFT9KOv/omxydNSo++uJMmURi005a00kVjrHuK9iF1YynB0gzr8b/mATy0N8Tv5jv2uBFtXWd9VUs3BZvPittxx9m23fylkJhB+J1BLtseFHSazcV0pJakJrstHSi7glV5F3TLgtbBz9EYE04onvlcixah+fv1A5Q0cw7Dej7uWUefw3oajgXbqmPxsB0YzC+6uIa4FfGtA0A6aRPDyz96EWes4P6Ahp9YGru4Un7csa3+lt12dcH+XD+hswImC8oxdg+AyKrW0HK2GTAEm+3z+uc7wsPQgIdfBZykpXsIwAAA=",
        name: "Fresh Strawberries",
        price: 36.00
    }),
    
]
export const CART_DUMMY_DATABASE =[
    new CartModel({
        id: 0,
        providerID: 0,
        providerName: "Khanh",
        cartItems: CartItemsList,
    }),
    new CartModel({
        id: 1,
        providerID: 1,
        providerName: "Khanh2",
        cartItems: CartItemsList2,
    }),
]