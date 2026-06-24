@UI @OnlineHelper @PayWithPoints @Positive

Feature: Verify that the User is able to access the Select & Pay with Points in ONSL portal and validate their functionality.

  Background:
    Given Navigate to the Online Helper Portal
    When I enter username "sys.admin" and password "Admin@1234" in Online Helper Portal
    And I click the Online Helper login button
    Then I should see the MY BTA Home Page

  @PayWithPoints_001 @Sanity @WIP
  Scenario:  Verify the user is able to view Eligible transactions in Select & Pay with Points section under Miscellanous Section - Eligible Card
    Given    Navigate to the Online Helper Portal


