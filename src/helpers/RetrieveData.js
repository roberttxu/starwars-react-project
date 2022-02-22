function RetrieveData(url, planets = []) {
  return new Promise((resolve, reject) =>
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw `${response.status}: ${response.statusText}`;
        }
        response
          .json()
          .then((data) => {
            planets.push(...data.results);
            if (data.next) {
              RetrieveData(data.next, planets).then(resolve).catch(reject);
            } else {
              resolve(planets);
            }
          })
          .catch(reject);
      })
      .catch(reject)
  );
}

export default RetrieveData;
