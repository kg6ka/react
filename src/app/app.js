;(function() {
    'use strict';

    var ipsumText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.';

    var MessageComponent = React.createClass({
        render: function() {
            return (
                <div>{this.props.message}</div>
            )
        }
    });


    var TitleComponent = React.createClass({
        smth: function() {
            console.log(ipsumText);
        },
        render: function() {
            return (
                <div onClick={this.smth}>{ipsumText}</div>
            )
        }
    });

    ReactDOM.render(
        <div>
            <TitleComponent />
            <MessageComponent message="Heeey!"/>
        </div>,
        document.getElementById('main')
    );

})();
