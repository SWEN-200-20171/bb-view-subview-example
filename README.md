# Bb View/SubView example

Another View/SubView example.

This time showing one way you could create a table loaded with subViews.

Also, a less obtrusive way to "log" to the web page.

You can build a docker image for this project from the project directory:

    docker image build -t bbexample .

Then can use the docker image to run this browser-only app:

    docker run --rm -t -i -v $PWD:/app -v /app/node_modules bbexample

