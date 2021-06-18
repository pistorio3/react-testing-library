import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

const moreDetails = 'More details';

describe('', () => {
  test('Verifica se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const linkDetails = getByText(moreDetails);
    userEvent.click(linkDetails);

    const pokemonDetails = getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();

    const heading = getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(heading).toBeInTheDocument();

    const infoText = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(infoText).toBeInTheDocument();
  });
  test('Verifica se existe uma seção com os mapas e as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);

    const linkDetails = getByText(moreDetails);
    userEvent.click(linkDetails);

    const map = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(map).toBeInTheDocument();

    const pokemonLocation = getAllByAltText('Pikachu location');
    expect(pokemonLocation).toHaveLength(2);
    expect(pokemonLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const locOne = getByText(/Kanto Viridian Forest/i);
    expect(locOne).toBeInTheDocument();

    const locTwo = getByText(/kanto Power Plant/i);
    expect(locTwo).toBeInTheDocument();
  });

  test('Verifica se o pokemon esta sendo favoritado', () => {
    const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);

    const linkDetails = getByText(moreDetails);
    userEvent.click(linkDetails);

    const checkBox = getByRole('checkbox');
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);
    expect(checkBox.checked).toBeTruthy();

    userEvent.click(checkBox);
    expect(checkBox.checked).toBeFalsy();

    const labelFavorite = getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
  });
});
