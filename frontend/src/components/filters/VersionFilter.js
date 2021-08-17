import React, { useState, useEffect } from "react";
import { Filter, Label, Select } from "./FilterStyles";

const MINIMUM_VERSION = "3.0";

function versionBetween(version, min, max) {
  const versionSplit = version.split(".");
  const minSplit = min ? min.split(".") : undefined;
  const maxSplit = max ? max.split(".") : undefined;

  if (minSplit) {
    if (minSplit[0] > versionSplit[0]) {
      return false;
    } else if (
      minSplit[0] === versionSplit[0] &&
      parseInt(minSplit[1]) > parseInt(versionSplit[1])
    ) {
      return false;
    }
  }
  if (maxSplit) {
    if (maxSplit[0] < versionSplit[0]) {
      return false;
    } else if (
      maxSplit[0] === versionSplit[0] &&
      parseInt(maxSplit[1]) < parseInt(versionSplit[1])
    ) {
      return false;
    }
  }
  return true;
}

function VersionFilter({ builds, onChange, value, latestVersion }) {
  const [patches, setPatches] = useState([]);

  useEffect(() => {
    const versionSet = new Set();
    builds.map((build) =>
      build.version &&
      versionBetween(build.version, MINIMUM_VERSION, latestVersion)
        ? versionSet.add(build.version)
        : null
    );

    const patches = Array.from(versionSet).sort((a, b) => {
      const aSplit = a.split(".");
      const bSplit = b.split(".");

      for (let i = 0; i < bSplit.length; i++) {
        if (bSplit[i] === undefined) {
          return 1;
        } else if (aSplit[i] === undefined) {
          return -1;
        }

        if (i + 1 >= bSplit.length || bSplit[i] - aSplit[i] !== 0) {
          return bSplit[i] - aSplit[i];
        }
      }

      return 0;
    });

    setPatches(patches);
    onChange({ target: { value: patches[0] } });
  }, [builds, latestVersion, onChange]);

  const patchOptions = patches.map((version) => (
    <option key={version} value={version}>
      {version}
    </option>
  ));

  return patchOptions.length ? (
    <Filter>
      <Label htmlFor="version-filter">Patch</Label>
      <Select id="version-filter" value={value} onChange={onChange}>
        {patchOptions}
      </Select>
    </Filter>
  ) : null;
}

export default React.memo(VersionFilter);
