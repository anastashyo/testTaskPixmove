describe('change todo list', () => {
  beforeEach(() => {
    cy.visit('https://forhemer.github.io/React-Todo-List/')
  })


  it('steps', () => {
    // variables to use in test
    var countTasks = 3

    //add countTasks elements to ToDo list    
    for (let i = 1; i <= countTasks; i++) {
      cy.get('.input-text').type(`Task ${i}{enter}`)
    }

    // **** Aliases ****

    //create alias for itemCollection
    cy.get('.TodoItem_item__iFWQW')
        .as('itemCollection')

    //create alias for checkedItem 
    cy.get('@itemCollection')
        .first()
        .as('itemToMarkChecked')

    //create alias for itemToDelete 
    cy.get('@itemCollection')
        .last()
        .as('itemToDelete')

    // **** End of Aliases ****

    //check that there's countTasks elements in ToDo list 
    cy.get('@itemCollection')
        .should('have.length', countTasks)

    //set itemToMarkChecked's checkbox as checked
    cy.get('@itemToMarkChecked')
        .find('[type=checkbox]')
        .check()

    //assert that text in itemToMarkChecked's is strikethrough
    cy.get('@itemToMarkChecked')
        .find('span')
        .should('have.css','text-decoration')
        .and('include', 'line-through')

    //delete itemToDelete
    cy.get('@itemToDelete').then($el => {
      var deletedItemName = $el.children('span').text()
      $el.remove()

      //check that element was removed
      cy.get('@itemCollection')
          .children('span')
          .contains(deletedItemName)
          .should('not.exist')
    })

  })
})