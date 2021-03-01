import { AuthService } from 'src/app/core/auth/auth.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { AqlEditorUiModel } from 'src/app/shared/models/aql/aql-editor-ui.model'
import { IAqlResolved } from '../../models/aql-resolved.interface'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { take } from 'rxjs/operators'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { AqlEditorCeatorComponent } from '../aql-editor-creator/aql-editor-creator.component'

@Component({
  selector: 'num-aql-editor',
  templateUrl: './aql-editor.component.html',
  styleUrls: ['./aql-editor.component.scss'],
})
export class AqlEditorComponent implements OnInit {
  resolvedData: IAqlResolved
  get aql(): AqlEditorUiModel {
    return this.resolvedData.aql
  }

  aqlForm: FormGroup
  isEditMode: boolean
  isCurrentUserOwner: boolean
  isExecutionLoading: boolean
  executionResult: IAqlExecutionResponse
  executionError: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aqlService: AqlService,
    private authService: AuthService,
    private toast: ToastMessageService
  ) {}

  @ViewChild('aqlCreator') aqlCreator: AqlEditorCeatorComponent

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData

    this.generateForm()

    this.isEditMode = this.aql?.id !== null

    this.authService.userInfoObservable$
      .pipe(take(1))
      .subscribe((user) => (this.isCurrentUserOwner = this.aql?.owner?.id === user?.sub))
  }

  generateForm(): void {
    this.aqlForm = new FormGroup({
      title: new FormControl(this.aql?.name, [Validators.required, Validators.minLength(3)]),
      purpose: new FormControl(this.aql?.purpose, [Validators.required, Validators.minLength(3)]),
      use: new FormControl(this.aql?.usage, [Validators.required, Validators.minLength(3)]),
      isPublic: new FormControl(this.aql?.publicAql),
    })
  }

  getAqlForApi(): IAqlApi {
    const formValues = this.aqlForm.value

    return this.aql?.convertToApi(
      formValues.title,
      formValues.purpose,
      formValues.use,
      formValues.isPublic
    )
  }

  async save(): Promise<void> {
    const validationResult = await this.aqlCreator.validate()
    if (!validationResult) {
      return
    }
    const aqlQuery = this.getAqlForApi()
    try {
      await this.aqlService.save(aqlQuery).toPromise()
      this.router.navigate(['aqls'], {})

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'AQL.SAVE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'AQL.SAVE_ERROR_MESSAGE',
      })
    }
  }

  cancel(): void {
    this.router.navigate(['aqls'], {})
  }

  async update(): Promise<void> {
    const validationResult = await this.aqlCreator.validate()
    if (!validationResult) {
      return
    }
    const aqlQuery = this.getAqlForApi()
    try {
      await this.aqlService.update(aqlQuery, this.aql?.id).toPromise()
      this.router.navigate(['aqls'], {})

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'AQL.SAVE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'AQL.SAVE_ERROR_MESSAGE',
      })
    }
  }

  async execute(): Promise<void> {
    this.isExecutionLoading = true
    try {
      this.executionResult = await this.aqlService.execute(this.aql.id).toPromise()
      this.isExecutionLoading = false
      this.executionError = null
    } catch (error) {
      this.executionError = error
      this.isExecutionLoading = false
      this.executionResult = null
    }
  }
}