FlowRouter.route("/", {
  name: "home",
  action: function() {
    // ReactLayout.render(MainLayout, {
    //   content: <WelcomeComponent name="123" />
    // });
    // lock.show();
    ReactLayout.render(MainLayout, {
      content: <WelcomeComponent/>
    });
  }
});


FlowRouter.route("/profile", {
  name: "profile",
  action: function(params, queryParams) {
    console.log("params:", params);
    console.log("queryParams:", queryParams);
    ReactLayout.render(MainLayout, {
      content: <ProfileComponent query={queryParams} />
    });
  }
});
