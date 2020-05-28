# Not maintained
May want to fork: https://github.com/meridius/confluence-to-markdown
# Confluence-to-Github-Markdown
Convert Confluence Html export to Github Markdown
# Requirements
 **Must have pandoc command line tool**
 
 http://pandoc.org/installing.html

 Make sure it was installed properly by doing `pandoc --version`
# Installation
`npm install -g confluence-to-github-markdown`
# Usage
  `confluence-to-github-markdown`
  
  `confluence-to-github-markdown <htmlFilesDirectory> <attachmentsExportPath> <markdownImageReference>`
  
### Defaults
  * `<htmlFilesDirectory>` : `Current Working Directory`
  * `<attachmentsExportPath>` : `"/public/assets/images/"` Where to export images
  * `<markdownImageReference>` : `"assets/images/"` Image reference in markdown files


# Export to HTML
Note that if the converter does not know how to handle a style, HTML to Markdown typically just leaves the HTML untouched (Markdown does allow for HTML tags).

### Step by Step Guide

1. Go to the space and choose Space tools > Content Tools on the sidebar. 
2. Choose Export. This option will only be visible if you have the 'Export Space' permission.
3. Select HTML  then choose Next.
4. Decide whether you need to customise the export:
  * Select Normal Export to produce an HTML file containing all the pages that you have permission to view.
  * Select Custom Export if you want to export a subset of pages, or to exclude comments from the export. 
5. [Export Pages](https://confluence.atlassian.com/doc/export-content-to-word-pdf-html-and-xml-139475.html#ExportContenttoWord,PDF,HTMLandXML-ExportmultiplepagestoHTML,XML,orPDF)
6. Extract zip
7. Open shell in extracted zip
8. run `confluence-to-github-markdown` in shell
