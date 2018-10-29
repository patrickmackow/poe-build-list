import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import TagBuilds from "../TagBuilds";

const fetchMock = require("fetch-mock");

afterEach(() => {
  cleanup();
  fetchMock.restore();
});

const match = {
  params: {
    tag: "cyclone"
  }
};

const builds = [
  {
    generatedTags: ["cyclone"],
    _id: "5bc0f66ba53ff0234c201323",
    title:
      '[3.4] "Delve Terrorizer" by Jessica - 10k life budget Cyclone Slayer, Everything viable (videos up)',
    author: "JessicaSc2",
    url: "https://www.pathofexile.com/forum/view-thread/2236634",
    views: 2871,
    replies: 13,
    createdOn: "2018-10-12T16:19:50.000Z",
    latestPost: "2018-10-16T02:30:43.000Z",
    gameClass: "duelist",
    version: "3.4",
    updatedOn: "2018-10-17T03:03:13.042Z"
  },
  {
    generatedTags: ["consecrated path", "cyclone"],
    _id: "5bc0f66ba53ff0234c20132c",
    title:
      "[3.4] For Slayer / Champion - Ngamahu Cyclone / Consecrated Path Build (Uber Lab Runner + End Game)",
    author: "kira1414",
    url: "https://www.pathofexile.com/forum/view-thread/1819239",
    views: 3155260,
    replies: 4444,
    createdOn: "2017-01-15T08:00:30.000Z",
    latestPost: "2018-10-11T15:29:12.000Z",
    gameClass: "duelist",
    version: "3.4",
    updatedOn: "2018-10-17T03:03:13.043Z"
  },
  {
    generatedTags: ["cyclone"],
    _id: "5bc0f66ba53ff0234c2013dc",
    title:
      "[3.4] Cyclone-tank Juggernaut / Best Cyclone Build / Full Video-Guide (eng) + DEMO The Shaper",
    author: "OkeyKeks",
    url: "https://www.pathofexile.com/forum/view-thread/1810582",
    views: 249291,
    replies: 238,
    createdOn: "2017-01-02T10:33:01.000Z",
    latestPost: "2018-10-07T15:36:35.000Z",
    gameClass: "marauder",
    version: "3.4",
    updatedOn: "2018-10-17T03:03:13.049Z"
  }
];

test("<TagBuilds />", async () => {
  fetchMock.get("glob:/api/tags/*", JSON.stringify(builds));
  const { debug, queryByTestId, getByTestId, getByLabelText } = render(
    <MemoryRouter>
      <TagBuilds match={match} />
    </MemoryRouter>
  );

  expect(queryByTestId("loading")).toBeTruthy();
  await waitForElement(() => getByTestId("build-table"));
  expect(queryByTestId("loading")).toBeFalsy();
  expect(getByLabelText("Class").value).toBe("All");
  expect(getByTestId("build-table").childElementCount).toBe(3);

  fireEvent.change(getByLabelText("Class"), { target: { value: "Duelist" } });
  expect(getByLabelText("Class").value).toBe("Duelist");
  expect(getByTestId("build-table").childElementCount).toBe(2);

  fireEvent.change(getByLabelText("Class"), { target: { value: "Marauder" } });
  expect(getByLabelText("Class").value).toBe("Marauder");
  expect(getByTestId("build-table").childElementCount).toBe(1);
});

test("<TagBuilds /> with build lower than default version filter", async () => {
  const builds = [
    {
      generatedTags: ["animate guardian", "righteous fire"],
      _id: "5bc0f66ba53ff0234c201404",
      title:
        "[3.2] TRIPLE your Righteous Fire Damage w/ ANIMATE GUARDIAN - Juggernaut",
      author: "Hollyphantom",
      url: "https://www.pathofexile.com/forum/view-thread/2118817",
      views: 49348,
      replies: 37,
      createdOn: "2018-03-24T13:52:12.000Z",
      latestPost: "2018-09-18T01:46:07.000Z",
      gameClass: "marauder",
      version: "3.2",
      updatedOn: "2018-10-17T03:03:13.050Z"
    }
  ];
  fetchMock.get("glob:/api/tags/*", JSON.stringify(builds));

  const { debug, queryByTestId, getByTestId, getByLabelText } = render(
    <MemoryRouter>
      <TagBuilds match={match} />
    </MemoryRouter>
  );

  await waitForElement(() => getByTestId("build-table"));
  expect(getByLabelText("Patch").value).toBe("3.2");
  expect(getByTestId("build-table").childElementCount).toBe(1);
});
