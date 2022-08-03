const AdvanceApplication = require('./advanceApplication')
const PersonalAllowance = require('./personalAllowance')
const program = require('commander');

program
  .option('-a, --advance')
  .option('-p, --personal')
  .parse();
  const options = program.opts();

  if (options.advance) {
    new AdvanceApplication().procedure()
  } else if (options.personal) {
    new PersonalAllowance().procedure()
  }
