"use client";

import API from "@/app/api/API";
import { removeKeySearchParams, toSearchParams } from "@/app/api/helper/apiHelper";
import MuiButton from "@/components/button/Button";
import MuiCheckbox, { FormCheckbox } from "@/components/checkbox/Checkbox";
import MuiChip from "@/components/chip/Chip";
import MuiDrawer from "@/components/drawer/Drawer";
import { formatToLabel } from "@/components/helper/component";
import { FormRadio, FormRadioGroup } from "@/components/radio/Radio";
import MuiTypography from "@/components/typography/Typograph";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

type IMangaListFilter = INextPage;

const MangaListFilter: React.FC<IMangaListFilter> = (props) => {
  const { searchParams } = props;
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const params = useMemo(() => toSearchParams(searchParams), [searchParams]);

  const onChange = useCallback(
    (e: RCE<HTMLInputElement>) => {
      const { name, value } = e.target;
      const _params = toSearchParams(searchParams, { page: 1 });

      if (value === API.PARAMS.DEFAULT.KEY) _params.delete(name);
      else _params.set(name, value);
      router.replace(`?${_params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const onRemoveFilter = useCallback(
    (key: string) => {
      const _params = toSearchParams(searchParams, { page: 1 });
      removeKeySearchParams(_params, key, ["all", "true"]);
      router.replace(`?${_params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {params.get("hide") && (
            <MuiChip label={`Hide: ${formatToLabel(params.get("hide"))}`} onDelete={() => onRemoveFilter("hide")} />
          )}
        </div>
        <MuiButton onClick={() => setOpen(true)}>Filter</MuiButton>
      </div>
      <MuiDrawer anchor="right" open={open} onClose={() => setOpen(false)} keepMounted={true}>
        <div className="flex flex-col gap-2 p-5">
          <MuiTypography fontSize={24}>Filter</MuiTypography>
          <div className="grid grid-cols-1">
            <FormRadioGroup
              label="Display List:"
              name="hide"
              value={params.get("hide") ?? API.PARAMS.DEFAULT.KEY}
              onChange={onChange}
            >
              <FormRadio value={API.PARAMS.DEFAULT.KEY} label="Default" />
              <FormRadio value="true" label="Hidden Only" />
              <FormRadio value="all" label="All Entries" />
            </FormRadioGroup>
          </div>
          <div className="grid grid-cols-1">
            <FormRadioGroup
              label="Type:"
              name="type"
              value={params.get("type") ?? API.PARAMS.DEFAULT.KEY}
              onChange={onChange}
            >
              <FormRadio value={API.PARAMS.DEFAULT.KEY} label="All" />
              <FormRadio value="manga" label="Manga" />
              <FormRadio value="manhwa" label="Manhwa" />
              <FormRadio value="manhua" label="Manhua" />
            </FormRadioGroup>
          </div>
        </div>
      </MuiDrawer>
    </>
  );
};

export default MangaListFilter;
