module Gitlab
  def self.config
    Settings
  end

  VERSION  = File.read(Rails.root.join("VERSION")).strip.freeze
REVISION = '69cda01'
end
