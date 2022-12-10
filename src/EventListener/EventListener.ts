import { ethers, providers } from "ethers";
import { EventResponseType } from "../types";
export class InitiliaseEthers {
  provider: ethers.providers.Provider;
  contract: ethers.Contract;
  constructor(
    rpcWss: string,
    contractAddress: string,
    contractABI: ethers.ContractInterface
  ) {
    this.provider = new ethers.providers.WebSocketProvider(rpcWss);
    this.contract = new ethers.Contract(
      contractAddress,
      contractABI,
      this.provider
    );
  }

  getAllContractEventObject(): { [name: string]: ethers.utils.EventFragment } {
    try {
      const eventObjects: { [name: string]: ethers.utils.EventFragment } =
        this.contract!.interface!.events;
      return eventObjects;
    } catch (error) {
      throw error;
    }
  }

  getAllContractEventName(): Array<string> {
    try {
      let eventList: Array<string> = [];
      const eventObjects: { [name: string]: ethers.utils.EventFragment } =
        this.getAllContractEventObject();
      Object.keys(eventObjects).forEach((eventDetail) => {
        eventList.push(eventObjects[eventDetail].name);
      });
      return eventList;
    } catch (error) {
      throw error;
    }
  }
}
// export class InitiliaseWeb3 {
//   web3: any;
//   contract: any;
//   constructor(
//     rpcWss: string,
//     contractAddress: string,
//     contractABI: any
//   ) {
//     cons
//   }
// }

export default class EventListner extends InitiliaseEthers {
  userInputEvents: Array<string> = [];
  contractEvents: Array<string>;
  eventListenerFunctions: any;

  constructor(
    rpcWss: string,
    contractAddress: string,
    contractABI: ethers.ContractInterface,
    events?: Array<string>
  ) {
    super(rpcWss, contractAddress, contractABI);
    if (events != undefined) this.userInputEvents = events;
    this.contractEvents = this.getAllContractEventName();
  }

  checkForValidEvents(): boolean {
    let flag = true;
    try {
      if (this.userInputEvents.length == 0) return true;
      this.userInputEvents.forEach((event) => {
        if (!this.contractEvents.includes(event)) {
          flag = false;
        }
      });
      return flag;
    } catch (error) {
      throw error;
    }
  }

  initiateEventMonitoring(callback: any) {
    try {
      if (this.checkForValidEvents()) {
        const eventsToMonitor: Array<string> =
          this.userInputEvents.length == 0
            ? this.contractEvents
            : this.userInputEvents;
        eventsToMonitor.forEach((event) => {
          this.contract.on(event, (...eventDetails) => {
            try {
              let eventResponse: EventResponseType = {
                eventName: eventDetails[eventDetails.length - 1].event,
                data: eventDetails[eventDetails.length - 1].args,
                trxHash: eventDetails[eventDetails.length - 1].transactionHash,
              };
              if (typeof callback == "function") callback(eventResponse);
            } catch (error) {
              console.log(error);
              this.contract.removeAllListeners();
              this.initiateEventMonitoring(callback);
            }
          });
        });
      } else {
        throw new Error("Please check the contract events");
      }
    } catch (error) {
      // this.contract.removeAllListeners();
    }
  }
}
