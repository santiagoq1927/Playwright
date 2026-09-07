Feature: Centyc form


    @form1
    Scenario: Complete Centyc form
        Given I open the Centyc form
        When I fill the all form fields and submit the form
        Then I should see the success message

    @form2
    Scenario Outline: Complete Centyc form second option
        Given I open the Centyc form
        When I fill <name> in the "nombre" field
        And I fill <email> in the "email" field
        And I select <motive> in the "motivo" field
        And I select "Rojo" in the favorite color
        And I fill <date> in the "fecha" field
        And I fill <subject> in the "asunto" field
        And I fill message <message> in the "mensaje" field
        And I click the "submit" button
        Then I should see the success message "Formulario enviado"

        Examples:
            |  name   |      email          |   motive   |  color    |    date        |        subject            |            message             |
            | "Juan"  | "juan@example.com"  | "Consulta" | "Rojo"    | "2026-07-16"   | "Informacion adicional"   | "Este es un mensaje de prueba" |
            | "David" | "david@example.com" | "Reclamo"  | "Otros"   | "2026-08-26"   | "Informacion requerida"   | "Este es un mensaje de test"   |