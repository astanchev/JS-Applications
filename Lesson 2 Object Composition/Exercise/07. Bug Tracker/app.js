function solve() {
    return (() => {
        let reports = [];
        let selector = '';
        let counter = 0;

        const report = function (author, description, reproducible, severity) {
            reports[counter] = {
                ID: counter++,
                author,
                description,
                reproducible,
                severity,
                status: 'Open'
            };     

            update();
        };

        const setStatus = function (id, newStatus) {
            reports[id].status = newStatus;
                 
            update();
        };

        const remove = function (id) {
            reports = reports.filter((bug) => bug.ID != id);
                 
            update();
        };

        const output = function (newSelector) {
            selector = newSelector;
        };

        const sort = function (method) {
            reports.sort((a, b) => method === 'author' ?
                a[method].localeCompare(b[method]) :
                a[method] - b[method]);      
                
            update();
        };

        const update = function() {
            document.querySelector(selector).innerHTML = '';
            
            reports.forEach((r) => {
                document.querySelector(selector)
                .innerHTML += 
                `<div id="report_${r.ID}" class="report">
                    <div class="body">
                        <p>${r.description}</p>
                    </div>
                    <div class="title">
                        <span class="author">Submitted by: ${r.author}</span>
                        <span class="status">${r.status} | ${r.severity}</span>
                    </div>
                </div>`;
            });
            
            // Second variant

            //document.querySelector(selector).textContent = '';

            // reports.forEach((bug) => {
            //     $(selector)
            //         .append($('<div>')
            //             .attr('id', "report_" + bug.ID)
            //             .addClass('report')
            //             .append($('<div>')
            //                 .addClass('body')
            //                 .append($('<p>')
            //                     .text(bug.description)))
            //             .append($('<div>')
            //                 .addClass('title')
            //                 .append($('<span>')
            //                     .addClass('author')
            //                     .text('Submitted by: ' + bug.author))
            //                 .append($('<span>')
            //                     .addClass('status')
            //                     .text(bug.status + " | " + bug.severity)
            //                 )
            //             )
            //         );
            // });
        };


        return {
            report,
            setStatus,
            remove,
            sort,
            output
        };
    })();
}