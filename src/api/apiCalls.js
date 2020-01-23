export const fetchCode = level => {
  return fetch(
    `https://www.random.org/integers/?num=4&min=0&max=${level}&col=1&base=10&format=plain&rnd=new`
  ).then(response => {
    if (!response.ok) {
      throw Error("Error getting random numbers");
    } else {
      return response.text();
    }
  });
};
