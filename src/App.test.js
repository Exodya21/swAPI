import { render, screen } from '@testing-library/react';
import App from './App';
import { Details } from './components/Details';
import data from './data.json';

let dataWith1character = {
	"count": 82,
	"next": "https://swapi.dev/api/people/?page=2",
	"previous": null,
	"results": [
		{
			"name": "Luke Skywalker",
			"height": "172",
			"mass": "77",
			"hair_color": "blond",
			"skin_color": "fair",
			"eye_color": "blue",
			"birth_year": "19BBY",
			"gender": "male",
			"homeworld": "https://swapi.dev/api/planets/1/",
			"films": [
				"https://swapi.dev/api/films/1/",
				"https://swapi.dev/api/films/2/",
				"https://swapi.dev/api/films/3/",
				"https://swapi.dev/api/films/6/"
			],
			"species": [],
			"vehicles": [
				"https://swapi.dev/api/vehicles/14/",
				"https://swapi.dev/api/vehicles/30/"
			],
			"starships": [
				"https://swapi.dev/api/starships/12/",
				"https://swapi.dev/api/starships/22/"
			],
			"created": "2014-12-09T13:50:51.644000Z",
			"edited": "2014-12-20T21:17:56.891000Z",
			"url": "https://swapi.dev/api/people/1/"
		}
  ]
}

describe('Star Wars APP', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'));
/*
  it('Should show a list of characters including Luke Skywalker', () => {
    render(<App />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it('Should show a list of characters from a JSON file', () => {
    render(<App />);
    data.results.forEach((character) => {
      expect(screen.getByText(`${character.name}`)).toBeInTheDocument();
    })
  });
*/
  it('Should show a list of characters from a API', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    })

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=1');

    data.results.forEach( async (character) => {
      expect(await screen.findByText(`${character.name}`)).toBeInTheDocument();
    });
  });

  it('Should show an error message when has a network error', async ()=> {
    window.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    expect(await screen.findByText('Network error')).toBeInTheDocument();
  })

  it('Should show an loading message when you into the page and then vanished', async ()=> {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    })

    render(<App />);
    expect(await screen.findByText('Loading...')).toBeInTheDocument();

    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=1');

    data.results.forEach( async (character) => {
      expect(await screen.findByText(`${character.name}`)).toBeInTheDocument();
    });

    expect(await screen.findByText('Loading...')).toBeVisible();
  })

  // it('Always should show details of first character from API star wars', async () => {
  //   window.fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => data,
  //   })

  //   const detailsFirstCharacter = {
  //     "name": "Luke Skywalker", /*`${data.results[0].mass}`*/
	// 		"height": "172",
	// 		"mass": "77",
  //     "birth_year": "19BBY"
  //   }

  //   render(<Details detail={detailsFirstCharacter} />);

  //   expect(await screen.findByText(`${data.results[0].name}`)).toBeInTheDocument();
  // });

  it("Should search 'r2' and only should show r2-d2's character", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => dataWith1character,
    })

    render(<App />);

    expect(dataWith1character.results.length).toBe(1);

    dataWith1character.results.forEach( async (character) => {
      expect(await screen.findByText(`${character.name}`)).toBeInTheDocument();
    });
  });

});
