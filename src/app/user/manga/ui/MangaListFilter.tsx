"use client";

import API from "@/app/api/API";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import MuiButton from "@/components/button/Button";
import MuiCheckbox, { FormCheckbox } from "@/components/checkbox/Checkbox";
import MuiDrawer from "@/components/drawer/Drawer";
import { FormRadio, FormRadioGroup } from "@/components/radio/Radio";
import MuiTypography from "@/components/typography/Typograph";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

type IMangaListFilter = INextPage;

const MangaListFilter: React.FC<IMangaListFilter> = (props) => {
  const { searchParams } = props;
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const params = useMemo(() => {
    return toSearchParams(searchParams);
  }, [searchParams]);

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

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <MuiButton onClick={() => setOpen(true)}>Filter</MuiButton>
      </div>
      <MuiDrawer anchor="right" open={open} onClose={() => setOpen(false)} keepMounted={true}>
        <div className="flex flex-col gap-2 p-5">
          <MuiTypography fontSize={24}>Filter</MuiTypography>
          <div className="grid grid-cols-1">
            <FormRadioGroup
              label="Display List"
              name="hide"
              value={params.get("hide") ?? API.PARAMS.DEFAULT.KEY}
              onChange={onChange}
            >
              <FormRadio value={API.PARAMS.DEFAULT.KEY} label="Default" />
              <FormRadio value="true" label="Hidden Only" />
              <FormRadio value="all" label="All Entries" />
            </FormRadioGroup>
          </div>
        </div>
      </MuiDrawer>
    </>
  );
};

export default MangaListFilter;
