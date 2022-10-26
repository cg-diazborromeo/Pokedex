/// <reference types="cypress" />

describe('Test pokedex', () => {
  before('Visita la pagina del pokedex', () => {
    cy.visit('http://127.0.0.1:8080/')
  });

  it('Comprueba display inicial', () => {
    cy.get('#logo').should('be.visible');
    cy.get('#lista-pokemones').should('be.visible');
    cy.get('img').should('be.visible');
    cy.get('#navegador').should('be.visible');
    cy.get('#ficha-pokemon').should('not.be.visible');
    cy.get('#navegador-individual').should('not.be.visible');
    cy.contains('Bulbasaur').should('be.visible');
    cy.contains('Previos').should('be.visible');
    cy.contains('1').should('be.visible');
    cy.contains('Select').should('be.visible');
    cy.contains('Siguientes').should('be.visible');

    cy.get('#lista-pokemones>div').should(($div) => {
      expect($div).to.have.length('20');
    });
  });

  it('Testea paginacion', () => {
    cy.get('#select-pagina').select('2').should('have.value', 2);
    cy.get('#select-pagina').should('be.visible');
    cy.get('#seleccionar').click();
    cy.contains('Pikachu').should("be.visible");

    cy.get('#siguiente').click();
    cy.contains('Golbat').should('be.visible');

    cy.get('#previo').click();
    cy.contains('Vulpix').should('be.visible');
  });

  it('Testea ficha individual', () => {
    cy.contains('Pikachu').click();
    cy.get('#lista-pokemones').should('not.be.visible');
    cy.get('#navegador').should('not.be.visible');
    cy.get('#logo').should('be.visible');
    cy.get('#ficha-pokemon').should('be.visible');
    cy.get('#navegador-individual').should('be.visible');
    cy.get('img').should('be.visible');
    cy.contains('Order').should('be.visible');
    cy.contains('Type').should('be.visible');
    cy.contains('Height').should('be.visible');
    cy.contains('Weight').should('be.visible');

    cy.get('#volver').click();
    cy.get('#lista-pokemones').should('be.visible');
    cy.get('#navegador').should('be.visible');
    cy.get('#ficha-pokemon').should('not.be.visible');
    cy.get('#navegador-individual').should('not.be.visible');
    cy.contains('Vulpix').should('be.visible').click();

    cy.get('#ficha-pokemon').should('be.visible');
    cy.get('#navegador-individual').should('be.visible');
    cy.get('img').should('be.visible');
    cy.contains('Order').should('be.visible');
    cy.contains('Type').should('be.visible');
    cy.contains('Height').should('be.visible');
    cy.contains('Weight').should('be.visible');
    cy.contains('Pikachu').should('not.be.visible');

    cy.get('#volver').click();
    cy.get('#lista-pokemones').should('be.visible');
    cy.get('#navegador').should('be.visible');
  });
});
