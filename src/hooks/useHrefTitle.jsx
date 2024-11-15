import { useEffect, useState } from "react";
import { useHref } from "react-router-dom";
import removeSplash from "../utils/removeSplash";

/**
 * @description: 获取当前路由的标题的hook, 会自动去除路径中的斜杠
 * @return {string}
 */
const useHrefTitle = () => {
  const [hrf, setHrf] = useState(useHref());

  useEffect(() => {
    const title = removeSplash(hrf);
    setHrf(title);
  }, [hrf]);

  return hrf;
};

export default useHrefTitle;
