import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);

//   expect(heading).toBeInTheDocument();
// });

describe('1 - Testa o componente <App.js />', () => {
  test('Verifica se a página principal é renderizada no caminho de URL /', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Verifica se o primeiro link possui o texto "Home"', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');

    expect(links[0].textContent).toBe('Home');
  });

  test('Verifica se o segundo link possui o texto "About"', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');

    expect(links[1].textContent).toBe('About');
  });

  test('Verifica se o terceiro link possui o texto "Favorite Pokémons"', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');

    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  test('Verifica ao clicar no link Home deve ser direcionado para a URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);

    userEvent.click(home);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Verifica se ao clicar no link About é direcionado para URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/About/i);

    userEvent.click(home);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Verifica se ao clicar no link Favoritos é direcionado para URL /favorites',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const home = getByText(/Favorite Pokémons/i);

      userEvent.click(home);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });

  test('Verifica se ao digitar URL inválida é direcionado para Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');

    const noMatch = getByText(/page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
