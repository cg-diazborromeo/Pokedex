/// <reference types="cypress" />

describe('Test pokedex', () => {
  before('Visita la pagina del pokedex', () => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('Comprueba display inicial', () => {
    cy.get('#logo').should('be.visible');
    cy.get('#lista-pokemones').should('be.visible');
    cy.get('#ficha-pokemon').should('not.be.visible');
    cy.contains('Bulbasaur').should('be.visible');
    cy.contains('Previos').should('be.visible');
    cy.contains('Select').should('be.visible');
    cy.contains('Siguientes').should('be.visible');
  })
})

// describe('Testeo exchange', () => {
//   before('Visita la pagina del exchange', () => {
//     cy.visit(' http://127.0.0.1:8080')
//   })

//   it('Comprueba disposicion incial', () => {
//     cy.get('#base-monetaria').should('not.be.visible');
//     cy.contains('Seleccionar').should('be.visible');
//     cy.contains('Seleccione una base monetaria').should('be.visible');
//     cy.get('#opciones-fechas').should('be.visible');
    
//   })

//   it('Selecciona moneda y fecha de cambios', () => {
//     cy.get('#opciones-monedas').select('ARS').should('have.value', 'ARS');
//     cy.get('#opciones-monedas>option').should('be.visible');
//     cy.get('#opciones-fechas').type('2020-08-25');
//     cy.get('#seleccionar').click();

//   })

//   it('Comprueba resultados', () => {
//     cy.get('#lista-cambios').should('be.visible')
//     cy.get('#lista-cambios>li').should(($li) => {
//       expect($li).to.have.length('171');
//     })

//   })

// })
