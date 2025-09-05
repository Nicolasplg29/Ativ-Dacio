from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import unittest


class TestLogins(unittest.TestCase):

    def setUp(self):
        # Setup inicial → abre navegador
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()

    def tearDown(self):
        # Fecha navegador após cada teste
        self.driver.quit()

    # ---------------- SAUCE DEMO ----------------
    def test_CT01_saucedemo_login_valido(self):
        driver = self.driver
        driver.get("https://www.saucedemo.com/")
        driver.find_element(By.ID, "user-name").send_keys("standard_user")
        driver.find_element(By.ID, "password").send_keys("secret_sauce")
        driver.find_element(By.ID, "login-button").click()
        time.sleep(2)
        self.assertIn("inventory", driver.current_url)

    def test_CT05_saucedemo_login_invalido(self):
        driver = self.driver
        driver.get("https://www.saucedemo.com/")
        driver.find_element(By.ID, "user-name").send_keys("user_invalido")
        driver.find_element(By.ID, "password").send_keys("senha_errada")
        driver.find_element(By.ID, "login-button").click()
        time.sleep(2)
        erro = driver.find_element(By.CSS_SELECTOR, "h3").text
        self.assertIn("Username and password do not match", erro)

    # ---------------- HEROKUAPP ----------------
    def test_CT02_herokuapp_login_valido(self):
        driver = self.driver
        driver.get("https://the-internet.herokuapp.com/login")
        driver.find_element(By.ID, "username").send_keys("tomsmith")
        driver.find_element(By.ID, "password").send_keys("SuperSecretPassword!")
        driver.find_element(By.CSS_SELECTOR, "button.radius").click()
        time.sleep(2)
        msg = driver.find_element(By.ID, "flash").text
        self.assertIn("You logged into a secure area!", msg)

    def test_CT06_herokuapp_login_invalido(self):
        driver = self.driver
        driver.get("https://the-internet.herokuapp.com/login")
        driver.find_element(By.ID, "username").send_keys("tomsmith")
        driver.find_element(By.ID, "password").send_keys("senha_errada")
        driver.find_element(By.CSS_SELECTOR, "button.radius").click()
        time.sleep(2)
        msg = driver.find_element(By.ID, "flash").text
        self.assertIn("Your password is invalid!", msg)

    # ---------------- PRACTICETESTAUTOMATION ----------------
    def test_CT03_practicetestautomation_login_valido(self):
        driver = self.driver
        driver.get("https://practicetestautomation.com/practice-test-login/")
        driver.find_element(By.ID, "username").send_keys("student")
        driver.find_element(By.ID, "password").send_keys("Password123")
        driver.find_element(By.ID, "submit").click()
        time.sleep(2)
        self.assertIn("logged-in-successfully", driver.current_url)

    def test_CT07_practicetestautomation_login_invalido(self):
        driver = self.driver
        driver.get("https://practicetestautomation.com/practice-test-login/")
        driver.find_element(By.ID, "username").send_keys("student")
        driver.find_element(By.ID, "password").send_keys("senha_errada")
        driver.find_element(By.ID, "submit").click()
        time.sleep(2)
        msg = driver.find_element(By.ID, "error").text
        self.assertIn("Your password is invalid!", msg)

    # ---------------- ORANGEHRM ----------------
    def test_CT04_orangehrm_login_valido(self):
        driver = self.driver
        driver.get("https://opensource-demo.orangehrmlive.com/")
        time.sleep(2)
        driver.find_element(By.NAME, "username").send_keys("Admin")
        driver.find_element(By.NAME, "password").send_keys("admin123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(3)
        self.assertIn("/dashboard", driver.current_url)

    def test_CT08_orangehrm_login_invalido(self):
        driver = self.driver
        driver.get("https://opensource-demo.orangehrmlive.com/")
        time.sleep(2)
        driver.find_element(By.NAME, "username").send_keys("Admin")
        driver.find_element(By.NAME, "password").send_keys("senha_errada")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(2)
        msg = driver.find_element(By.CSS_SELECTOR, ".oxd-alert-content-text").text
        self.assertIn("Invalid credentials", msg)


if __name__ == "__main__":
    unittest.main()
