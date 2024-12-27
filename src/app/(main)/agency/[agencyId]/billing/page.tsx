import React from "react";
import { addOnProducts, pricingCards } from "@/lib/constants";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import PricingCard from "./_components/pricing-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";

type Props = {
  params: { agencyId: string };
};

const page = async ({ params }: Props) => {
  //CHALLENGE : Create the add on  products

  const agencySubscription = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    select: {
      customerId: true,
      Subscription: true,
    },
  });

  const currentPlanDetails = pricingCards.find(
    (c) => c.priceId === agencySubscription?.Subscription?.priceId
  );

  return (
    <>
      <h1 className="text-4xl p-4">Billing</h1>
      <Separator className=" mb-6" />
      <h2 className="text-2xl p-4">Current Plan</h2>
      <div className="flex flex-col lg:!flex-row justify-between gap-8">
        <PricingCard
          planExists={agencySubscription?.Subscription?.active === true}
          prices={[10, 20, 30]}
          customerId={agencySubscription?.customerId || ""}
          amt={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.price || "$0"
              : "$0"
          }
          buttonCta={
            agencySubscription?.Subscription?.active === true
              ? "Change Plan"
              : "Get Started"
          }
          highlightDescription="Want to modify your plan? You can do this here. If you have
          further question contact support@websy-app.com"
          highlightTitle="Plan Options"
          description={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.description || "Lets get started"
              : "Lets get started! Pick a plan that works best for you."
          }
          duration="/ month"
          features={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.features || []
              : currentPlanDetails?.features ||
                pricingCards.find((pricing) => pricing.title === "Starter")
                  ?.features ||
                []
          }
          title={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.title || "Starter"
              : "Starter"
          }
        />
      </div>
      <h2 className="text-2xl p-4">Payment History</h2>
      <Table className="bg-card border-[1px] border-border rounded-md">
        <TableHeader className="rounded-md">
          <TableRow>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[200px]">Invoice Id</TableHead>
            <TableHead className="w-[300px]">Date</TableHead>
            <TableHead className="w-[200px]">Paid</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </>
  );
};

export default page;
