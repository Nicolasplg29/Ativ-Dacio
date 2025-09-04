const { Builder, By, until } = require("selenium-webdriver");

async function testSauceDemoLoginValido() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://www.saucedemo.com/");
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.id("password")).sendKeys("secret_sauce");
        await driver.findElement(By.id("login-button")).click();
        await driver.wait(until.urlContains("inventory"), 5000);
        console.log("✅ SauceDemo login válido passou");
    } finally {
        await driver.quit();
    }
}

async function testSauceDemoLoginInvalido() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://www.saucedemo.com/");
        await driver.findElement(By.id("user-name")).sendKeys("user_invalido");
        await driver.findElement(By.id("password")).sendKeys("senha_errada");
        await driver.findElement(By.id("login-button")).click();
        let erro = await driver.findElement(By.css("h3")).getText();
        if (erro.includes("Username and password do not match")) {
            console.log("✅ SauceDemo login inválido passou");
        }
    } finally {
        await driver.quit();
    }
}

async function testHerokuappLoginValido() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://the-internet.herokuapp.com/login");
        await driver.findElement(By.id("username")).sendKeys("tomsmith");
        await driver.findElement(By.id("password")).sendKeys("SuperSecretPassword!");
        await driver.findElement(By.css("button.radius")).click();
        let mensagem = await driver.findElement(By.id("flash")).getText();
        if (mensagem.includes("You logged into a secure area!")) {
            console.log("✅ Herokuapp login válido passou");
        }
    } finally {
        await driver.quit();
    }
}

async function testHerokuappLoginInvalido() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://the-internet.herokuapp.com/login");
        await driver.findElement(By.id("username")).sendKeys("tomsmith");
        await driver.findElement(By.id("password")).sendKeys("senha_errada");
        await driver.findElement(By.css("button.radius")).click();
        let mensagem = await driver.findElement(By.id("flash")).getText();
        if (mensagem.includes("Your password is invalid!")) {
            console.log("✅ Herokuapp login inválido passou");
        }
    } finally {
        await driver.quit();
    }
}

async function testPracticeTestAutomationLoginValido() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://practicetestautomation.com/practice-test-login/");
        await driver.findElement(By.id("username")).sendKeys("student");
        await driver.findElement(By.id("password")).sendKeys("Password123");
        await driver.findElement(By.id("submit")).click();
        await driver.wait(until.urlContains("logged-in-successfully"), 5000);
        console.log("✅ PracticeTestAutomation login válido passou");
    } finally {
        await driver.quit();
    }
}

async function testPracticeTestAutomationLoginInvalido() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://practicetestautomation.com/practice-test-login/");
        await driver.findElement(By.id("username")).sendKeys("student");
        await driver.findElement(By.id("password")).sendKeys("senha_errada");
        await driver.findElement(By.id("submit")).click();
        let mensagem = await driver.findElement(By.id("error")).getText();
        if (mensagem.includes("Your password is invalid!")) {
            console.log("✅ PracticeTestAutomation login inválido passou");
        }
    } finally {
        await driver.quit();
    }
}

async function testOrangeHRMLoginValido() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://opensource-demo.orangehrmlive.com/");
        await driver.findElement(By.name("username")).sendKeys("Admin");
        await driver.findElement(By.name("password")).sendKeys("admin123");
        await driver.findElement(By.css("button[type='submit']")).click();
        await driver.wait(until.urlContains("/dashboard"), 5000);
        console.log("✅ OrangeHRM login válido passou");
    } finally {
        await driver.quit();
    }
}

async function testOrangeHRMLoginInvalido() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://opensource-demo.orangehrmlive.com/");
        await driver.findElement(By.name("username")).sendKeys("Admin");
        await driver.findElement(By.name("password")).sendKeys("senha_errada");
        await driver.findElement(By.css("button[type='submit']")).click();
        let mensagem = await driver.findElement(By.css(".oxd-alert-content-text")).getText();
        if (mensagem.includes("Invalid credentials")) {
            console.log("✅ OrangeHRM login inválido passou");
        }
    } finally {
        await driver.quit();
    }
}

// Executando os testes em sequência
(async function runTests() {
    await testSauceDemoLoginValido();
    await testSauceDemoLoginInvalido();
    await testHerokuappLoginValido();
    await testHerokuappLoginInvalido();
    await testPracticeTestAutomationLoginValido();
    await testPracticeTestAutomationLoginInvalido();
    await testOrangeHRMLoginValido();
    await testOrangeHRMLoginInvalido();
})();
