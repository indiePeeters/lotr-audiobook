const fs = require('fs') // eslint-disable-line @typescript-eslint/no-var-requires
const _ = require('lodash') // eslint-disable-line @typescript-eslint/no-var-requires

const inputFile = './src/models/generated/graphql.ts'
const typeNamesToRemove = ['_Input', '_On_Conflict', '_Exp', 'Args', '_Aggregate', '_Column', '_Constraint', 'Subscription_Root']
const exportTypeOrEnumRegex = /export (?:type|enum) (\w*)(?:.*){[^}]*};?/gm
const commentsRegex = /\/\*\*(.|[\r\n])*?\*\//g
const multiNewLineRegex = /\n\s*\n/g

fs.readFile(inputFile, 'utf8', function (err, input) {
  if (err) {
    return console.log(err)
  }

  let output = input
  let match
  while ((match = exportTypeOrEnumRegex.exec(output)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === exportTypeOrEnumRegex.lastIndex) {
      exportTypeOrEnumRegex.lastIndex++
    }

    const exportString = match[0] // Contains whole export block (e.g. export type MyType { id: string })
    const typeName = match[1] // Contains type name (e.g. MyType)
    const toRemove = typeNamesToRemove.some(suffix => typeName.endsWith(suffix))

    if (toRemove) {
      // Replace export block
      output = output.substring(0, match.index) + output.substring(match.index + exportString.length) // Replace between the indexes
      exportTypeOrEnumRegex.lastIndex = 0 // Reset lastIndex to make sure replacing the export block does not skip anything

      // Replace redundant related attributes of the removed typename
      const attributeRegex = new RegExp(`(.*):(.*)${typeName}(.*)`, 'g')
      output = output.replace(attributeRegex, '')
    } else {
      // Convert typename to pascalCase
      const pascalCaseTypeName = _.startCase(_.camelCase(typeName)).replace(/ /g, '')
      output = _.replace(output, new RegExp(typeName, 'g'), pascalCaseTypeName)
    }
  }

  output = output.replace(commentsRegex, '') // Remove all comments
  output = output.replace(multiNewLineRegex, '\n') // Remove all double enters

  fs.writeFile(inputFile, output, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})
