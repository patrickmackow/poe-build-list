function setTitle(title) {
  const transformedTitle = ((title) => {
    return title
      .split(" ")
      .map((t) => {
        return t[0].toUpperCase() + t.slice(1);
      })
      .join(" ");
  })(title);

  document.title = transformedTitle + " | PoE Build List";
}

export { setTitle };
