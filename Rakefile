task :default => :serve

desc 'Set up the build environment'
task :init do
    # Install packages
    sh 'bundle install'
end

desc 'Build site with Jekyll'
task :build => ['clean'] do
    jekyll('build')
end

desc 'Start server and regenerate files on change'
task :serve do
    jekyll('serve')
end

desc 'Clean up the generated site'
task :clean do
    rm_rf '_site'
    rm '.jekyll-metadata', :force => true
end

# Run Jekyll
def jekyll(opts = '')
    if ENV['dev']=='on'
        dev = ' --plugins=_plugins,_plugins-dev'
    else
        dev = ''
    end
    sh "bundle exec jekyll #{opts}#{dev} --trace"
end
