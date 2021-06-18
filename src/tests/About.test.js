import React from 'react';

import renderWithRouter from '../helper/renderWithRouter';
import { About } from '../components';

describe('2 - Testa o componente <About.js />', () => {
  test('Verifica se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph = getByText(/This application simulates/i);

    expect(paragraph).toBeInTheDocument();
  });

  test('Verifica se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraphOne = getByText(/digital encyclopedia/i);
    expect(paragraphOne).toBeInTheDocument();

    const paragraphTwo = getByText(/and see more/i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Verifica se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);
    const srcImg = getByRole('img');

    expect(srcImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
