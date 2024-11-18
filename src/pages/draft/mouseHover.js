/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const mouseOverAndOut = (parentRef, childRef) => {
  const parent = parentRef.current;
  const child = childRef.current;

  parent.addEventListener("mouseover", (e) => {
    const { target, relatedTarget } = e;
    if (!parent.contains(relatedTarget)) {
      console.log("parent mouseover");
    }
  });

  parent.addEventListener("mouseout", (e) => {
    console.log("parent mouseout");
  });

  child.addEventListener("mouseover", () => {
    console.log("child mouseover");
  });

  child.addEventListener("mouseout", () => {
    console.log("child mouseout");
  });

  return () => {
    parent.removeEventListener("mouseover", () => {
      console.log("parent mouseover");
    });

    parent.removeEventListener("mouseout", () => {
      console.log("parent mouseout");
    });

    child.removeEventListener("mouseover", () => {
      console.log("child mouseover");
    });

    child.removeEventListener("mouseout", () => {
      console.log("child mouseout");
    });
  };
};

const mouseEnterAndLeave = (parentRef, childRef) => {
  const parent = parentRef.current;
  const child = childRef.current;

  parent.addEventListener("mouseenter", () => {
    console.log("parent mouseenter");
  });

  parent.addEventListener("mouseleave", () => {
    console.log("parent mouseleave");
  });

  child.addEventListener("mouseenter", () => {
    console.log("child mouseenter");
  });

  child.addEventListener("mouseleave", () => {
    console.log("child mouseleave");
  });

  return () => {
    parent.removeEventListener("mouseenter", () => {
      console.log("parent mouseenter");
    });

    parent.removeEventListener("mouseleave", () => {
      console.log("parent mouseleave");
    });

    child.removeEventListener("mouseenter", () => {
      console.log("child mouseenter");
    });

    child.removeEventListener("mouseleave", () => {
      console.log("child mouseleave");
    });
  };
};

export { mouseOverAndOut, mouseEnterAndLeave };
