export async function getDataCourses (url) : Promise {
    const response = await fetch(url)
    .catch(error => {
        console.error(error);
    });

    const data = await response.json();
     console.log('data', data);
     return data;
}