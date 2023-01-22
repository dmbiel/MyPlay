// @ts-check
const { test, expect } = require('@playwright/test');

test('Elementor_Change_screenshots', async ({ page }) => {
  await page.goto('https://regression-test.elementor.cloud/');

  // Expect a title to contain text
  await expect(page).toHaveTitle('Regression Test – Just another Elementor Cloud website ;)');
  await page.screenshot({path: 'current.png'});
  //Log in 
  await page.goto('https://regression-test.elementor.cloud/wp-admin/');
  await page.fill('#user_login', 'automation-senior');
  await page.fill('#user_pass','GoodLuck100:)');
  //Go to change page
  await page.goto('https://regression-test.elementor.cloud/?elementor');
  await page.evaluate(() => {
     $e.run('document/elements/settings', {
      container: elementor.getPreviewContainer(),
      settings: { custom_css: '#main h1{font-size: 100px}' }
      });
       $e.run('document/save/default');
  });
  await page.goto('https://regression-test.elementor.cloud/');
  await page.screenshot({path: 'reference.png'});
 //Compare screenshots and create 3 screenshots witch shows the difference.
  const result = await compareScreenshot('current.png', 'reference.png', 'diff.png');
  
  //Clean up the changes
  await page.goto('https://regression-test.elementor.cloud/?elementor');
  await page.evaluate(() => {
      $e.run('document/elements/settings', {
      container: elementor.getPreviewContainer(),
      settings: { custom_css: ''  }
      });
       $e.run( 'document/save/default' );
  });
});

