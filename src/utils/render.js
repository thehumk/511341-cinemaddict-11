export const render = (container, component, place = `beforeend`) => {
  switch (place) {
    case `beforeend`:
      container.append(component.getElement());
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
