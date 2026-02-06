# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "Input Drive Security home" [ref=e6] [cursor=pointer]:
          - /url: /index.html
          - img "Input Drive Security" [ref=e7]
          - strong [ref=e8]: Input Drive Security
        - link "Follow on X" [ref=e9] [cursor=pointer]:
          - /url: https://x.com/greg_inputdrive
          - img "X" [ref=e10]
        - link "View on GitHub" [ref=e12] [cursor=pointer]:
          - /url: https://github.com/inputdrive
          - img "GitHub" [ref=e13]
        - link "Connect on LinkedIn" [ref=e15] [cursor=pointer]:
          - /url: https://linkedin.com/in/greggutman/
          - img "LinkedIn" [ref=e16]
        - button "Toggle light and dark mode" [ref=e18] [cursor=pointer]:
          - img [ref=e19]
      - navigation "Main navigation" [ref=e21]:
        - link "Index" [ref=e22] [cursor=pointer]:
          - /url: /index.html
  - main [ref=e23]:
    - heading "Hello World" [level=1] [ref=e24]
    - heading "Wow this is a \"random\" page." [level=2] [ref=e25]
    - paragraph [ref=e26]: also hosted with GitHub Pages.
    - paragraph [ref=e27]: "convert the last modified property into a date object:"
    - paragraph [ref=e28]:
      - time [ref=e29]: "Page last edited: 2/6/2026, 10:16:39 AM"
    - paragraph [ref=e30]:
      - link "Back to Index" [ref=e31] [cursor=pointer]:
        - /url: /index.html
  - contentinfo [ref=e32]:
    - generic [ref=e33]: © 2026 Input Drive Security
```