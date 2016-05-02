/*
Copyright (c) 2016 by SimoAmi (http://codepen.io/simoami/pen/zstvo)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$(function() {
    var data = [
        {
            action: 'type',
            strings: ["npm install -g horizon"],
            output: '<span class="gray">+horizon@0.2.4 installed</span><br>&nbsp;',
            postDelay: 1000,
        },
        {
            action: 'type',
            strings: ["hz init chat-app"],
            output: 'Created new project directory chat-app<br>&nbsp;',
            postDelay: 1000,
        },
        {
            action: 'type',
            strings: ["cd chatapp"],
            output: '&nbsp;',
            postDelay: 1000,
        },
        {
            action: 'type',
            strings: ["hz deploy"],
            output: '<span class="gray">Deploying chat-app on Horizon Cloud...</span><br>&nbsp;&nbsp;<span class="green">✓</span>&nbsp;&nbsp;chat-app is live at <a href="https://chat-app.hz-cdn.com">https://chat-app.hz-cdn.com</a>',
            postDelay: 1000,
        },
    ]
    runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
      $('.history').html('');
    }
    switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 30,
            callback: function() {
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('$ ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;
              if(pos < data.length) {
                setTimeout(function() {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
            }
          });
          break;
        case 'view':

          break;
    }
}
