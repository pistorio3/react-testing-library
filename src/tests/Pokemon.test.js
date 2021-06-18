import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

const moreDetails = 'More details';
describe('6 - Testa o componente <Pokemon.js />', () => {
  test('Verifica se é renderizado um card com as informações do pokémon.', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByRole('img');

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toContain('Pikachu sprite');
  });

  test('Verifica se o card do Pokémon contém um link de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const navLink = getByText(moreDetails);

    expect(navLink.href).toContain('/pokemons/25');
  });

  test('Verifica se ao clicar em "More details" a URL tem /pokemons/id', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const details = getByText(moreDetails);
    userEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toContain('/pokemons/25');

    const screenText = getByText('Pikachu Details');
    expect(screenText).toBeInTheDocument();
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getAllByRole, getByLabelText } = renderWithRouter(<App />);

    const pokemonDetails = getByText(moreDetails);
    expect(pokemonDetails).toBeInTheDocument();
    userEvent.click(pokemonDetails);

    const favoriteCheck = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);
    const favoriteImg = getAllByRole('img');

    expect(favoriteImg[1].alt).toBe('Pikachu is marked as favorite');
    expect(favoriteImg[1].src).toContain('/star-icon.svg');
  });
});
