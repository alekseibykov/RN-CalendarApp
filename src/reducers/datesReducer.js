// Prototype extentions here
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const INITIAL_STATE = {
  today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
  tomorrow: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).addDays(1),
  upcoming: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).addDays(2),
};

export const datesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
