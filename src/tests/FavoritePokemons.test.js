import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('1 - Testa o componente <App.js />', () => {
  test('Verifica se é exibido a mensagem "No favorite pokemon found".', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const messageNotFound = getByText(/No favorite pokemon found/i);

    expect(messageNotFound).toBeInTheDocument();
  });
  test('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const checkFavorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(checkFavorite);

    const { getByTestId } = render(<FavoritePokemons />);
    const favoritePokemon = getByTestId('pokemon-name');

    expect(favoritePokemon).toBeInTheDocument();
  });
  test('Verifica se nenhum card de pokémon é exibido, se não estiver favoritado.', () => {
    const { queryByTestId } = renderWithRouter(<FavoritePokemons />);
    const pokemonName = queryByTestId('pokemon-name');

    expect(pokemonName).not.toBeInTheDocument();
  });
});
