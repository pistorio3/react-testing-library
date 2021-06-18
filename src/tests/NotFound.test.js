import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';

import NotFound from '../components/NotFound';

describe('4 - Testa o componente <NotFound.js />', () => {
  test('Verifica se contém um heading h2 com texto "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('Verifica se página mostra a imagem do pikachu triste', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img');

    expect(img[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
