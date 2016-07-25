require 'yaml'

# Load configuration
begin
    $config = YAML.load_file('_deploy-config.yml')
rescue Exception
    puts "Missing or incorrect configuration."
    exit 1
end
$project = "~/#{$config['project']}"

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
task :docker_update do
    commands = [
        "cd #{$project}",
        compose('pull'),
        compose('build'),
        compose("up -d ")
    ]
    ssh(commands.join(' && '))
end

desc 'Synonym for docker_update'
task :deploy => :docker_update

desc 'Restart Docker containers'
task :docker_restart do
    scp(files=['docker-compose.yml', 'docker-compose.prod.yml'], remote_dest=$project)
    commands = [
        "cd #{$project}",
        compose('pull'),
        compose('build'),
        compose("up -d")
    ]
    ssh(commands.join(' && '))
end

desc 'Initialize remote Docker host'
task :docker_init do
    ssh("mkdir -p #{$project} && mkdir -p ~/.docker")
    scp(files=[$config['robot_credentials']], remote_dest='~/.docker/config.json')
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
    sh "ssh #{$config['host']} -p #{$config['port']} '#{cmd}'"
end

# Run command via SSH on remote host
def scp(files=[], remote_dest='~')
    sh "scp -P #{$config['port']} #{files.join(' ')} #{$config['host']}:#{remote_dest}"
end

# Shorthand for Docker Compose with multiple configurations
def compose(cmd='')
    return "docker-compose -f #{$project}/docker-compose.yml -f #{$project}/docker-compose.prod.yml #{cmd}"
end
