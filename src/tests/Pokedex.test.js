import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';

import data from '../data';

import App from '../App';

const nextPokemon = 'Próximo pokémon';
const pokemonName = 'pokemon-name';
describe('5 - Testa o componente <Pokedex.js />', () => {
  test('Verifica se contém um heading h2 com o texto "Encountered pokémons".', () => {
    const { getByRole } = renderWithRouter(<App />);
    const headingPokedex = getByRole('heading', {
      level: 2,
    });

    expect(headingPokedex).toHaveTextContent('Encountered pokémons');
  });
  test('Verifica se é exibido o próximo Pokémon quando o botão é clicado.', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);

    data.forEach(({ name }) => {
      expect(getAllByText('More details').length).toBe(1);
      expect(getByText(name)).toBeInTheDocument();

      fireEvent.click(getByText(nextPokemon));
    });

    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('Verifica se existem todos os botões de filtro', () => {
    renderWithRouter(<App />);

    const filters = ['Electric', 'Bug', 'Fire', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.queryAllByTestId('pokemon-type-button');

    expect(filterButtons.length).toBe(filters.length);
  });

  test('Verifica se estiver selecionando Eletric todos os pokémons irão aparecer', () => {
    renderWithRouter(<App />);

    const allPokemonsList = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const buttonNext = screen.getByTestId('next-pokemon');

    userEvent.click(buttonElectric);
    userEvent.click(buttonAll);

    allPokemonsList.forEach((element) => {
      const pokemonNameString = screen.getByTestId(pokemonName);

      expect(pokemonNameString).toHaveTextContent(element);

      userEvent.click(buttonNext);
    });

    const name = screen.getByTestId(pokemonName);
    expect(name).toHaveTextContent('Pikachu');
  });
});
