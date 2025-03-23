/* eslint-disable no-console */
import { useRef } from "react";

const FileUpload = () => {
  const fileRef = useRef(null);

  function handleChangeFile(event) {
    if (event.target.files) {
      const files = Array.from(event.target.files).filter(
        (file) => file.name !== ".DS_Store"
        // 省略其他文件类型的过滤
      );
      const tasks = []; // 任务队列
      const folderMap = new Map(); // 文件夹映射表，避免重复创建文件夹 task

      files.forEach((file) => {
        console.log("file webkitRelativePath: ", file.webkitRelativePath);
        const [rootFolderName, ...fileLevel] = file.webkitRelativePath.split("/");

        // 1. 创建根目录任务
        if (tasks.length === 0) {
          tasks.push(createTask("RootFolder", rootFolderName, null));
        }

        // 2. 为子目录和子文件创建任务
        let parentFolder = tasks[0];
        fileLevel.forEach((item, index) => {
          const isFolder = index < fileLevel.length - 1; // 非最后一层级
          const folderPath = fileLevel.slice(0, index + 1).join("/"); // 文件夹的路径

          if (isFolder) {
            let folderTask = folderMap.get(folderPath);
            if (!folderTask) {
              // 创建文件夹任务
              folderTask = createTask("Folder", item, parentFolder);
              folderMap.set(folderPath, folderTask);
              tasks.push(folderTask); // 加入任务队列
            }
            parentFolder = folderTask;
          } else {
            // 创建文件任务
            tasks.push(createTask("File", item, parentFolder)); // 加入任务队列
          }
        });
      });

      console.log("tasks", tasks);
    }

    event.target.value = "";
  }

  function createTask(type, name, parent) {
    const task = {
      type: type,
      name: name,
      parent: parent,
      id: "", // 服务端的数据id，如在文件夹上传成功后，将数据 id 赋值到这里，为下面的文件上传提供父级 id
    };
    return task;
  }

  return (
    <div>
      <button onClick={() => fileRef.current.click()}>点击上传</button>
      {/* 文件夹上传 */}

      <input type="file" ref={fileRef} onChange={handleChangeFile} webkitdirectory="" />
    </div>
  );
};

export default FileUpload;
