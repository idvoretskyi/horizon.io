require 'yaml'

# Load configuration
begin
    $config = YAML.load_file('_deploy-config.yml')
rescue Exception
    puts "Missing or incorrect configuration."
    exit 1
end

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

desc 'Deploy Docker image'
task :docker_deploy do
    $c = $config['web']['jekyll_container']
    ssh("docker pull && docker-compose build #{$c} && docker-compose horizonio_jekyll")
end

desc 'Restart Docker containers'
task :docker_restart do
    ssh('docker pull && docker-compose build && docker-compose up’')
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

# Run command via SSH on remote host
def ssh(cmd='')
    sh "ssh #{$config['host']} -p #{$config['port']} #{cmd}"
end
