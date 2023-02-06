import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllCategoryTree,
  setCategoryHandle,

} from "../../../store/slices/ProductSlice";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useNavigate } from "react-router-dom";
import { checkObjectEmpty } from "../../../stogare_function/listActions";

const TreeCategory = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const id = props.id;

  const DataCategoriesTree = useSelector((state) => state.product.CategoryTree);
  const CategoryHandle = useSelector((state) => state.product.CategoryHandle);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [expanded, setExpanded] = useState([]);
  const [newTree, setNewTree] = useState({});

  const loadCategoryTree = useCallback(async () => {
    await dispatch(FetchAllCategoryTree());
  });
  useEffect(() => {
    if (DataCategoriesTree.status != 200 && DataCategoriesTree.status != 204) {
      loadCategoryTree();
    }
    if (DataCategoriesTree.status == 200 && isFirstRender) {
      setIsFirstRender(false);
      setNewTree({
        ID: 0,
        Name: "All",
        CategoryChildren: DataCategoriesTree.data.data,
      });
    }
    if (!checkObjectEmpty(newTree)) {
      const result = newTree;
      const findArrayNode = (result) => {
        expanded.push(result.ID);
        if (result.ID == id) {
          dispatch(setCategoryHandle(result));
        } else if (result.CategoryChildren)
          result.CategoryChildren.map((data) => {
            findArrayNode(data);
          });
      };
      findArrayNode(result);
    }
  }, [
    expanded,
    id,
    isFirstRender,
    newTree,
    dispatch,
    DataCategoriesTree,
    loadCategoryTree,
  ]);

  const renderTree = (nodes) => (
    <TreeItem
      {...nodes}
      onClick={() => {
        dispatch(setCategoryHandle(nodes));
        navigate(`/category/${nodes.ID}`);
      }}
      key={nodes.ID}
      nodeId={nodes.ID}
      label={nodes.Name}
    >
      {Array.isArray(nodes.CategoryChildren)
        ? nodes.CategoryChildren.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <div>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        selected={[CategoryHandle.ID]}
        defaultExpanded={expanded}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderTree(newTree)}
      </TreeView>
    </div>
  );
};
export default TreeCategory;
