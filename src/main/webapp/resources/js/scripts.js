function generateBatchFile() {
    const suiteType = document.getElementById('suiteType').value;
    const environment = document.getElementById('environment').value;
    const executedBy = document.getElementById('executedBy').value;
    const executedDate = document.getElementById('executedDate').value;
    const projectPath = "D:\\MIlanaAutomation\\MilanaQAAutomationProject";

    if (!suiteType || !environment || !executedBy || !executedDate) {
        alert('Please fill out all fields.');
        return;
    }

    // Construct the Maven command
    const command = `@echo off\nREM Maven command generated\nmvn test -Dcucumber.filter.tags="${suiteType}" -Dbrowser="chrome" -DapplicationUrl="${environment}"\n`;

    const batContent = `
        @echo off
        REM Navigate to the project directory
        cd /d "${projectPath}"

        REM Execute the Maven command
        ${command}

        REM Pause to keep the command prompt window open
        pause
        `;


    // Display the command in the textarea
    document.getElementById('commandOutput').value = command;

    // Create a Blob with the command text
    const blob = new Blob([batContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger a download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mvn_command.bat'; // File name
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
}
