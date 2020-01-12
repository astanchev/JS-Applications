function solve() {
    return (() => {
        let [reports, selector, counter] = [
            [], '', 0
        ];

        const report = function (author, description, reproducible, severity) {
            reports[counter] = {
                ID: counter++,
                author,
                description,
                reproducible,
                severity,
                status: 'Open'
            };
            draw();
        };

        const setStatus = function (id, newStatus) {
            reports[id].status = newStatus;
            draw();
        };

        const remove = function (id) {
            reports = reports.filter((bug) => bug.ID != id);
            draw();
        };

        const sort = function (method) {
            reports.sort((a, b) => method === 'author' ?
                a[method].localeCompare(b[method]) :
                a[method] - b[method]);
            draw();
        };

        const output = function (newSelector) {
            selector = newSelector;
        };

        const draw = function () {
            document.querySelector(selector).textContent = '';

            reports.forEach((bug) => {
                $(selector)
                    .append($('<div>')
                        .attr('id', "report_" + bug.ID)
                        .addClass('report')
                        .append($('<div>')
                            .addClass('body')
                            .append($('<p>')
                                .text(bug.description)))
                        .append($('<div>')
                            .addClass('title')
                            .append($('<span>')
                                .addClass('author')
                                .text('Submitted by: ' + bug.author))
                            .append($('<span>')
                                .addClass('status')
                                .text(bug.status + " | " + bug.severity)
                            )
                        )
                    );
            });
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