from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1920, "height": 1080})
    page = context.new_page()
    port = "5120"
    
    # helper for adding from shop
    def add_from_shop(product_name, qty=1):
        page.goto(f"http://localhost:{port}/Shop")
        page.wait_for_timeout(1000)
        link = page.locator(f"text={product_name}")
        if link.count() > 0:
            link.first.click(force=True)
            page.wait_for_timeout(1500)
            
            for _ in range(qty - 1):
                btn_plus = page.locator("button:has-text('+')")
                if btn_plus.count() > 0:
                    btn_plus.first.click(force=True)
                    page.wait_for_timeout(500)
                    
            add_btn = page.locator("button:has-text('Do koszyka')")
            if add_btn.count() > 0:
                add_btn.first.evaluate("node => node.click()")
            else:
                page.locator("button[type='submit']").first.evaluate("node => node.click()")
                
            page.wait_for_timeout(1500)
            print(f"Added {product_name} x{qty}")

    try:
        page.goto(f"http://localhost:{port}/Identity/Account/Login")
        email_input = page.locator("input[type='email']")
        if email_input.count() > 0:
            email_input.first.fill("miloszforystek@gmail.com")
            page.locator("input[type='password']").first.fill("milosz")
            page.locator("button[type='submit']").first.click(force=True)
            page.wait_for_timeout(2000)

        # Go to cart and empty it first just in case
        page.goto(f"http://localhost:{port}/Cart")
        page.wait_for_timeout(1000)
        while page.locator("button:has-text('Usuń')").count() > 0:
            page.locator("button:has-text('Usuń')").first.click(force=True)
            page.wait_for_timeout(1000)
    except Exception as e:
        pass
        
    try:
        # Accept cookies if any
        try:
            page.locator("text=ZGADZAM SIĘ").click(timeout=1000)
        except:
            pass

        add_from_shop("Swiecznik 'Minimalist'", 1)
        add_from_shop("Patera 'Morska Bryza'", 1)
        add_from_shop("Karafka 'Kryształowy Blask'", 3)
        
        page.goto(f"http://localhost:{port}/Cart")
        page.wait_for_timeout(2000)
        page.screenshot(path="BiankaGlass/assets/cart.png")
        print("Captured cart!")
        
        checkout_btn = page.locator("text=FINALIZUJ")
        if checkout_btn.count() > 0:
            checkout_btn.first.click(force=True)
            page.wait_for_timeout(2000)
        else:
            page.goto(f"http://localhost:{port}/CheckoutSummary")
            page.wait_for_timeout(2000)
        
        try:
            page.fill("input[name*='FirstName']", "Miłosz")
            page.fill("input[name*='LastName']", "Forystek")
            page.fill("input[name*='PhoneNumber']", "+48111222333")
            page.fill("input[name*='Street']", "Sądkowa 153")
            page.fill("input[name*='ZipCode']", "38-204")
            page.fill("input[name*='City']", "Sądkowa")
            cb = page.locator("input[type='checkbox']")
            if cb.count() > 0:
                cb.first.check(force=True)
        except:
            pass
        
        page.wait_for_timeout(1000)
        page.screenshot(path="BiankaGlass/assets/checkout.png")
        print("Captured checkout!")

    except Exception as e:
        print(f"Error capturing: {e}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
