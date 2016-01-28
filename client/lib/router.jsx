FlowRouter.route("/", {
  name: "home",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <WelcomeComponent />
    });
  }
});


FlowRouter.route("/profile", {
  name: "profile",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <ProfileComponent query={queryParams} />
    });
  }
});
