export async function getGalacticPeople(page) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        // console.log(response);
        if(!response.ok) {
            throw new NetworkError();
        }
        const data = await response.json();
        return data;
    } catch(err) {
        throw err;
    }
}

export async function getGalacticCharacter(id = 1) {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const data = response.json();
    /*console.log(data);*/
    return data
}

export async function searchCharacter(name) {
    const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
    const data = response.json();
    return data
}

export async function moreDetails(detail, id) {
    // let res = []

    // urlList.forEach(async (url) => {
    //     const response = await fetch(url);
    //     const data = response.json();
    //     res.push(data)
    // });

    // return res

    const response = await fetch(`https://swapi.dev/api/${detail}/${id}`);
    const data = response.json();
    return data

}

export function getMoreDetails(array, index, detail) {
    let id = array[index].split('/').splice(-2)[0];
    return moreDetails(detail, id)    
}

class NetworkError extends Error {
    constructor() {
        super('Network error');
    }
}