export const fetchRanomNumbers = () => {
    return fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
     .then(response => {
       if(!response.ok) {
         throw Error ('Error getting randome numbers')
       } else {
       return response.text()
       }
     })
}