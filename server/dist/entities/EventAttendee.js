"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventAttendee = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Event_1 = require("./Event");
const Attendee_1 = require("./Attendee");
let EventAttendee = class EventAttendee extends typeorm_1.BaseEntity {};
__decorate(
  [
    typeorm_1.PrimaryColumn(),
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number),
  ],
  EventAttendee.prototype,
  "eventId",
  void 0
);
__decorate(
  [
    typeorm_1.PrimaryColumn(),
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number),
  ],
  EventAttendee.prototype,
  "attendeeId",
  void 0
);
__decorate(
  [
    typeorm_1.Column({ default: false }),
    type_graphql_1.Field(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean),
  ],
  EventAttendee.prototype,
  "isConfirmed",
  void 0
);
__decorate(
  [
    typeorm_1.Column(),
    type_graphql_1.Field(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean),
  ],
  EventAttendee.prototype,
  "isPayingCash",
  void 0
);
__decorate(
  [
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Date),
  ],
  EventAttendee.prototype,
  "joinTime",
  void 0
);
__decorate(
  [
    typeorm_1.ManyToOne(
      () => Event_1.Event,
      (event) => event.attendeeConnection,
      {
        onDelete: "CASCADE",
      }
    ),
    __metadata("design:type", Event_1.Event),
  ],
  EventAttendee.prototype,
  "event",
  void 0
);
__decorate(
  [
    typeorm_1.ManyToOne(
      () => Attendee_1.Attendee,
      (attendee) => attendee.eventConnection,
      {
        onDelete: "CASCADE",
      }
    ),
    type_graphql_1.Field(() => Attendee_1.Attendee),
    __metadata("design:type", Attendee_1.Attendee),
  ],
  EventAttendee.prototype,
  "attendee",
  void 0
);
EventAttendee = __decorate(
  [type_graphql_1.ObjectType(), typeorm_1.Entity()],
  EventAttendee
);
exports.EventAttendee = EventAttendee;
//# sourceMappingURL=EventAttendee.js.map
